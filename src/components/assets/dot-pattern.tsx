"use client"

import { useEffect, useRef } from "react"
import { Box, type BoxProps } from "@/components/layout/box"
import { cn } from "@/lib/utils"

export type DotPatternProps = BoxProps & {
  circleDiameter?: number
  gap?: number
  palette?: string[]
  hoverRadius?: number
  hoverScale?: number
  breatheAmount?: number
  breathePeriod?: number
  sizeLerpSpeed?: number
  unhoverAlpha?: number
  pulseCountMin?: number
  pulseCountMax?: number
  driftSpeed?: number
  noiseScale?: number
  timeScale?: number
}

export const DotPattern: React.FC<DotPatternProps> = ({
  circleDiameter = 4,
  gap = 6,
  palette = ["#cbcada", "#c0d0cb", "#e1dbcd"],
  hoverRadius = 90,
  hoverScale = 2,
  breatheAmount = 0.5,
  breathePeriod = 5.0,
  sizeLerpSpeed = 10,
  unhoverAlpha = 0.7,
  pulseCountMin = 10,
  pulseCountMax = 12,
  driftSpeed = 72,
  noiseScale = 0.002,
  timeScale = 0.15,
  className,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!(container && canvas)) {
      return
    }

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) {
      return
    }

    let dpr = Math.max(1, window.devicePixelRatio || 1)

    let cols = 0
    let rows = 0
    let scales: Float32Array
    let colorIdx: Uint8Array
    let width = 0
    let height = 0
    let radius = circleDiameter / 2
    let breathPhase = 0
    let sizeLerpAlpha = 1
    let pulses: Array<{ x: number; y: number; sx: number; sy: number; sa: number; sb: number }> = []

    const step = () => circleDiameter + gap
    const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
    const rand2 = (ix: number, iy: number, seed: number) => {
      const s = Math.sin(ix * 127.1 + iy * 311.7 + seed * 74.7) * 43_758.545_312_3
      return s - Math.floor(s)
    }
    const noise2 = (x: number, y: number, seed: number) => {
      const xi = Math.floor(x),
        yi = Math.floor(y)
      const xf = x - xi,
        yf = y - yi
      const u = fade(xf),
        v = fade(yf)
      const n00 = rand2(xi, yi, seed),
        n10 = rand2(xi + 1, yi, seed)
      const n01 = rand2(xi, yi + 1, seed),
        n11 = rand2(xi + 1, yi + 1, seed)
      const x1 = lerp(n00, n10, u),
        x2 = lerp(n01, n11, u)
      return lerp(x1, x2, v)
    }

    const setup = () => {
      // biome-ignore lint/suspicious/noBitwiseOperators: intentional truncation to integer
      const w = (container.clientWidth || 0) | 0
      // biome-ignore lint/suspicious/noBitwiseOperators: intentional truncation to integer
      const h = (container.clientHeight || 0) | 0
      width = w
      height = h
      dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.max(1, Math.floor(w / step()))
      rows = Math.max(1, Math.floor(h / step()))

      const n = cols * rows
      scales = new Float32Array(n)
      colorIdx = new Uint8Array(n)
      for (let i = 0; i < n; i++) {
        scales[i] = 1
        // biome-ignore lint/suspicious/noBitwiseOperators: intentional truncation to integer
        colorIdx[i] = (Math.random() * palette.length) | 0
      }
      radius = circleDiameter / 2

      pulses = []
      const count = randInt(pulseCountMin, pulseCountMax)
      for (let k = 0; k < count; k++) {
        pulses.push({
          x: Math.random() * width,
          y: Math.random() * height,
          sx: Math.random() * 1000,
          sy: Math.random() * 1000,
          sa: Math.random() * 1000,
          sb: Math.random() * 1000,
        })
      }
    }

    const update = (dt: number, time: number) => {
      breathPhase = (breathPhase + dt / breathePeriod) % 1
      sizeLerpAlpha = 1 - Math.exp(-sizeLerpSpeed * dt)

      const t = time * 0.001 * timeScale
      const ns = noiseScale
      for (const p of pulses) {
        let vx = noise2(p.x * ns + p.sx + t, p.y * ns + p.sy, p.sa) * 2 - 1
        let vy = noise2(p.x * ns + p.sy, p.y * ns + p.sx - t, p.sb) * 2 - 1
        const len = Math.hypot(vx, vy) || 1
        vx /= len
        vy /= len
        p.x += vx * driftSpeed * dt
        p.y += vy * driftSpeed * dt
        const wrap = hoverRadius
        if (p.x < -wrap) {
          p.x = width + wrap
        } else if (p.x > width + wrap) {
          p.x = -wrap
        }
        if (p.y < -wrap) {
          p.y = height + wrap
        } else if (p.y > height + wrap) {
          p.y = -wrap
        }
      }
    }

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: animation rendering logic is inherently complex
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const s = step()
      let idx = 0
      const breathEase = (1 - Math.cos(2 * Math.PI * breathPhase)) * 0.5
      const effRadius = hoverRadius * (1 + breatheAmount * breathEase)

      for (let i = 0; i < cols; i++) {
        const cx = i * s + radius
        for (let j = 0; j < rows; j++) {
          const cy = j * s + radius

          let influence = 0
          for (const p of pulses) {
            const dx = cx - p.x,
              dy = cy - p.y
            const dist = Math.hypot(dx, dy)
            if (dist < effRadius) {
              const t = 1 - dist / effRadius
              const eased = 1 - (1 - t) * (1 - t)
              if (eased > influence) {
                influence = eased
              }
            }
          }

          const targetScale = 1 + (hoverScale - 1) * influence
          const cur = scales[idx]
          const next = cur + (targetScale - cur) * sizeLerpAlpha
          scales[idx] = next

          const alpha = unhoverAlpha + (1 - unhoverAlpha) * influence
          ctx.globalAlpha = alpha
          ctx.fillStyle = palette[colorIdx[idx]]
          ctx.beginPath()
          ctx.arc(cx, cy, radius * next, 0, Math.PI * 2)
          ctx.fill()
          idx += 1
        }
      }
      ctx.globalAlpha = 1
    }

    let running = false
    let last = 0
    let rafId = 0

    const frame = (t?: number) => {
      if (!running) {
        return
      }
      const time = t ?? performance.now()
      const dt = last ? (time - last) / 1000 : 0.016
      last = time
      update(dt, time)
      draw()
      rafId = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      setup()
      if (running) {
        last = 0
      }
    })
    ro.observe(container)

    let io: IntersectionObserver | null = null
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          const vis = entry.isIntersecting
          if (vis && !running) {
            running = true
            last = 0
            rafId = requestAnimationFrame(frame)
          } else if (!vis && running) {
            running = false
            cancelAnimationFrame(rafId)
          }
        },
        { threshold: 0 }
      )
      io.observe(container)
    } else {
      running = true
      rafId = requestAnimationFrame(frame)
    }

    setup()
    running = true
    requestAnimationFrame(frame)

    const onVis = () => {
      if (document.hidden && running) {
        running = false
        cancelAnimationFrame(rafId)
      } else if (!(document.hidden || running)) {
        running = true
        last = 0
        requestAnimationFrame(frame)
      }
    }
    window.addEventListener("visibilitychange", onVis)

    return () => {
      running = false
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener("visibilitychange", onVis)
      ro.disconnect()
      if (io) {
        io.disconnect()
      }
    }
  }, [
    circleDiameter,
    gap,
    palette,
    hoverRadius,
    hoverScale,
    breatheAmount,
    breathePeriod,
    sizeLerpSpeed,
    unhoverAlpha,
    pulseCountMin,
    pulseCountMax,
    driftSpeed,
    noiseScale,
    timeScale,
  ])

  return (
    <Box className={cn("overflow-hidden", className)} {...rest}>
      <Box className="relative h-full w-[101%]" ref={containerRef}>
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }}
        />
      </Box>
    </Box>
  )
}

export default DotPattern

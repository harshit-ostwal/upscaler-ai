import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function page() {

  return (
    <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
      <div className="w-[60%] lg:w-1/5 flex items-center justify-center">
        <Image
          src={"/Logo/Upscaler.png"}
          width={674}
          height={196}
          alt='Upscaler Ai - Image Enhancer | Harshit Ostwal'
          quality={100}
          priority
        />
      </div>

      <div className="max-w-md">
        <label className="flex flex-col gap-2 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-zinc-200 p-10">
          <div className="bg-white rounded-full p-2">
            <UploadCloud size={24} color='blue' />
          </div>
          <div className="text-center">
            <h5 className="text-zinc-950">Click to upload or drag and drop</h5>
            <p className="text-xs text-zinc-900">SVG, PNG, JPG or GIF (max. 1920x1080px)</p>
          </div>
          <input type="file" className="sr-only" />
        </label>
      </div>
    </div>
  )
}
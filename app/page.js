"use client"
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { DownloadCloud, Loader2, Repeat, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function page() {

    const { toast } = useToast();
    const maxFileSize = 10000;
    const [imageFile, setImageFile] = useState("");
    const [upscalerImage, setUpscalerImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(false);

    const handleFileChange = (e) => {
        try {
            setImageFile(e.target.files[0]);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Upscaler Ai",
                description: "Image Not Selected?",
            })
        }
    }

    const handleNewImage = () => {
        setImageFile(null);
        setUpscalerImage(null);
        setSelectedImage(false);
    }

    const handleSumbit = async () => {
        const data = new FormData();
        data.append('image', imageFile);
        data.append('sizeFactor', 2);
        data.append('imageStyle', 'default');
        data.append('noiseCancellationFactor', '0');

        const options = {
            method: 'POST',
            url: 'https://ai-picture-upscaler.p.rapidapi.com/supersize-image',
            headers: {
                'X-RapidAPI-Key': '7576085ea4msh253f58532c2f646p1ff104jsn9326372b7929',
                'X-RapidAPI-Host': 'ai-picture-upscaler.p.rapidapi.com',
            },
            data: data,
            responseType: 'arraybuffer',
        }

        try {
            const fileSize = imageFile.size / 1024;

            if (fileSize > maxFileSize) {
                toast({
                    variant: "destructive",
                    title: "Upscaler Ai",
                    description: "Image Must Be Less Than 10 MB.",
                });
                return;
            }
            else {
                setSelectedImage(true);
                const res = await axios.request(options);
                setUpscalerImage(`data:image/png;base64,${Buffer.from(res.data, 'binary').toString('base64')}`);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Upscaler Ai",
                description: "Not Able To Enhance Image. Try Again?",
            });
        }
    }

    const handleDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = upscalerImage;
        downloadLink.download = 'Upscaler Ai.png';
        downloadLink.click();
    }

    return (
        <>
            <div className="bg-gradient-to-r from-rose-400 to-yellow-600 font-Comfortaa h-screen w-full flex flex-col gap-10 items-center justify-center p-2">
                <Image
                    src={"/Logo/Upscaler.png"}
                    width={200}
                    height={57}
                    alt='Upscaler Ai - Image Enhancer | Harshit Ostwal'
                    quality={100}
                    priority
                />

                {upscalerImage ?
                    <>
                        <div className="max-w-md flex flex-col items-center justify-center gap-10">
                            <Image
                                src={upscalerImage}
                                width={1980}
                                height={1020}
                                alt='Upscaler Ai - Image Enhancer'
                                className="aspect-video rounded-md"
                            />
                            <div className='flex flex-col gap-2 w-full'>
                                <button onClick={handleDownload} className="px-10 py-4 font-bold bg-[#222222] text-white rounded-md flex gap-2 justify-center"><DownloadCloud size={24} />Download Image</button>
                                <button onClick={handleNewImage} className="px-10 py-4 font-bold bg-[#222222] text-white rounded-md flex gap-2 justify-center"><Repeat size={24} />Another Image</button>
                            </div>
                        </div>
                    </> : <>
                        <div className="max-w-md flex flex-col gap-2 text-center">
                            <label className="flex flex-col p-10 gap-5 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-zinc-200 py-10">
                                <div className="bg-white rounded-full p-2">
                                    <UploadCloud size={24} color='blue' />
                                </div>
                                <div className="text-center">
                                    <h5 className="text-zinc-950 font-bold">Click to upload or drag and drop</h5>
                                    <p className="text-xs text-zinc-900 font-semibold">SVG, PNG, JPG or GIF (max. 1920x1080px)</p>
                                    <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </label>
                            {imageFile &&
                                <>
                                    <p className='text-sm p-2 font-semibold'>{imageFile.name}</p>
                                    <button onClick={handleSumbit} className="px-10 py-4 font-bold bg-[#222222] text-white rounded-md flex gap-2 justify-center">
                                        {selectedImage ? <>
                                            <Loader2 size={24} className="animate-spin" /> Loading
                                        </> : <>
                                            <UploadCloud size={24} />Upscaler Image
                                        </>}
                                    </button>
                                </>}
                        </div>
                    </>}
            </div>
        </>
    )
}

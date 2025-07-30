import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useTransition, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { addComment } from '../../store/commentSlice';
import { Input } from "@/components/ui/input"
import {Button} from '@/components/ui/button.tsx'
import toast from 'react-hot-toast';

const CreateComment = () => {
    const { postId } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isPending, startTransition] = useTransition();
    const {getToken} = useAuth();
    const dispatch = useDispatch();

    const submit = (data) => {
        startTransition(async() => {
            try {
                const formData = new FormData();
                formData.append('content', data.content);
                console.log(formData.content);
                const token = await getToken();
                const response = await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/comment/post/${postId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => res.data);
                console.log("Comment create ", response);
                setValue('content', '');
                dispatch(addComment({
                    postId,
                    comment: response.comment
                }))
            } catch (err) {
                toast.error(err.message);
            }
        })
    }


    useEffect(() => {
        if(errors.content) {
            toast.error(errors.content?.message);
        }
    }, [errors.content])
  return (
    <div >
        <form onSubmit={handleSubmit(submit)} className='px-5 flex gap-3'>
            <Input className="max-w-md" placeholder="Write Comment" {...register('content', { required: "Please enter a valid comment content" })} />
            <Button variant="outline" className="cursor-pointer" type="submit" disabled={isPending}>
                {isPending ? <PulseLoader /> : 'Submit'}
            </Button>
        </form>
    </div>
  )
}

export default CreateComment
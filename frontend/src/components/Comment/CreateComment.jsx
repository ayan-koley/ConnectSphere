import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useTransition, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { addComment } from '../../store/commentSlice';
import { Input } from "@/components/ui/input"
import {Button} from '@/components/ui/button.tsx'
import toast from 'react-hot-toast';

const CreateComment = () => {
    const { postId } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isPending, startTransition] = useTransition();
    const {getToken, isSignedIn} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data) => {
        startTransition(async() => {
            try {
                if(!isSignedIn) return navigate("/sign-in")
                const token = await getToken();
                const response = await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/comment/post/${postId}`, {
                    content: data.content
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => res.data);
                console.log("Comment create ", response);
                setValue('content', '');
                dispatch(addComment({
                    postId,
                    comment: response.data[0]
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
                {isPending ? <PulseLoader size={6}  color='white' /> : 'Submit'}
            </Button>
        </form>
    </div>
  )
}

export default CreateComment
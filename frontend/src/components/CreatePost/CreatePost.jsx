import React, { useCallback, useEffect, useRef, useTransition } from 'react'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import AuthAvatar from '../Header/AuthAvatar';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { debounce } from '../../utils/debounce';
import axios from 'axios';
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, CrossIcon } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux'
import { useAuth } from '@clerk/clerk-react';
import { addToFeed } from '../../store/feedSlice';

const CreatePost = ({post}) => {

    const {register, formState: { errors }, handleSubmit, setValue, control} = useForm();
    const userData = useSelector(state => state.authSlice.userData);
    const {getToken} = useAuth();
    const dispatch = useDispatch();

    const src = "";
    const [isPending, startTransition] = useTransition();
    const [suggestions, setSuggestions] = useState([]);
    const [mentionMap, setMentionMap] = useState({});
    const description = useWatch({control, name: "description"});


    const submit = (data) => {
        startTransition(async() => {
            try {
                const { hashtags, mentions } = extractTagsAndMentions(data.description);
                const mentionsUserid = mentions?.map((m) => mentionMap?.[m]);
                const formData = new FormData();
                formData.append("description", data.description);
                formData.append("active", "true");

                // append multiple files
                Array.from(data.files).forEach((file) => {
                    formData.append("files", file);
                });

                // append arrays (hashtags and mentions)
                hashtags?.forEach((tag) => formData.append("hashtag[]", tag));
                mentionsUserid?.forEach((id) => formData.append("mention[]", id));

                console.log("form data is ", formData);

                const token = await getToken();
                const responseOfCreatePost = await axios.post("https://cute-showers-help.loca.lt/api/v1/post/create", formData, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                ).then((res) => {
                    toast.success(res.data.message);
                    return res.data;
                });
                console.log("New Post ", responseOfCreatePost);
                dispatch(addToFeed(responseOfCreatePost.data[0]));

                setValue('description', '');
                setValue('files');

            } catch (error) {
                toast.error(error.message);
            }
        })
    }

    const extractTagsAndMentions = (text) => {
        const hashtags = [...text.matchAll(/#(\w+)/g)].map((m) => m[1]);
        const mentions = [...text.matchAll(/@(\w+)/g)].map((m) => m[1]);
        return { hashtags, mentions };
    };
    const handleSelectUser = (user) => {
        const { username, _id} = user;
        const mentionMatch = description.match(/@(\w*)$/);
        const mentionToReplace = mentionMatch?.[1]
        const updated = description.replace(`@${mentionToReplace}`, `@${username} `);
        setValue("description", updated);
        setMentionMap((prev) => [{...prev, [username]: _id}]);
        setSuggestions([]);
    }
    const fetchedSuggestions = (mention) => {
        startTransition(async() => {
            try {
                const suggest = await axios.get(`https://cute-showers-help.loca.lt/api/v1/search/user?username=${mention}`).then(res => res.data);

                console.log(suggest.data);
                setSuggestions(suggest.data);

            } catch (error) {
                toast.error(error.message);
                setSuggestions([]);
            }
        })
    }
    const searchWithDebounce = useCallback(debounce(fetchedSuggestions, 1000), []);

    useEffect(()=> {
        const match = description?.match(/@(\w*)$/);
        if(match) {
            searchWithDebounce(match[1]);
        }   else {
            setSuggestions([])
        }
    }, [description])

    useEffect(() => {
        if(errors.description) {
            toast.error(errors.description?.message);
        }
    }, [errors.description])

  return (
    <Card className="mb-6">
        <CardContent className="pb-4">
            {post && (<div className='mb-2'>
                <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>You can only update the description Please avoid to change Hashtag and Mentions.</AlertTitle>
                </Alert>
            </div>)}
            <form onSubmit={handleSubmit(submit)}>
                <div className="flex space-x-3">
                    <AuthAvatar src={userData?.image} className={"h-10 w-10"} />
                    <Textarea
                        placeholder="What's happening?"
                        className={`min-h-[80px] resize-none border-none p-4 text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0`}
                        {...register("description", { required: "Please enter a description"  })}
                        defaultValue={post?.description}
                    />
                </div>
                {suggestions && (
                    <div className='relative p-4 ml-12 mt-5 rounded-xs'>
                    { suggestions.map((user) => (
                        <div key={user._id} className='flex gap-3 cursor-pointer mt-4 hover:bg-accent/50 border px-3 py-2 rounded-md ' onClick={() => handleSelectUser(user)}>
                            <div className='flex gap-3 items-center'>
                                <AuthAvatar src={user.avatar?.image} className={'h-10 w-10'} />
                            </div>
                            <div className='flex flex-col'>
                                <span>{user.firstName} {user.lastName}</span>
                                <span>@{user.username}</span>
                            </div>
                        </div>
                    ))}
                </div>
                )}
                

                <div className='flex-1'>
                    <div className={`${post && 'flex-row-reverse'} flex items-center justify-between mt-4`}>
                        <div className={`${post && 'hidden'} ml-15`}>

                            <Input type="file" accept="image/*, .mp4" multiple {...register("files", {
                                validate: {
                                    maxFile: (files) => {
                                        return files.length <= 5 || toast.error("You can upload up to 5 files only");
                                    }
                                }
                            })} />
                        </div>
                        {errors.media && <p className="text-red-500">{errors.media.message}</p>}
                        
                        <Button 
                            className={`px-6 cursor-pointer ${isPending && 'cursor-not-allowed'}`}
                            type="submit"
                            disabled={isPending}
                        >
                            {post ? 'Update' : 'Post'}
                        </Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
  )
}

export default CreatePost
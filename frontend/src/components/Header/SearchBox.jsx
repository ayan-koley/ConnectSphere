import React, { useEffect, useState, useTransition } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { CrossIcon, Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearResults, setError, setLoading, setResults } from '../../store/searchSlice';
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { addToHistory } from '../../store/searchHistorySlice';

const SearchBox = () => {
    const history = useSelector(state => state.searchHistory.history);
    const[searchHistory, setSearchHistory] = useState(history || []);
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, formState: { errors }, handleSubmit, setValue} = useForm();


    const submit = (data) => {
        startTransition(async() => {
            try {
                navigate("/search");
                dispatch(clearResults())
                const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/search?input=${data.searchInput}`).then(res => res.data);
                dispatch(setLoading(true));
                dispatch(setResults({
                    users: response.data.users,
                    posts: response.data.posts
                }))
                dispatch(setLoading(false));
                dispatch(addToHistory(data.searchInput))
                setSearchHistory((prev) => [...prev, data.searchInput])
            } catch (err) {
                dispatch(setError(err.message));
                toast.error(err.message);
            }   finally {
                setValue("searchInput", '');
            }
        })
    }


    useEffect(() => {
        if(errors.input) {
            toast.error(errors.input?.message);
        }
    }, [errors.searchInput])

  return (
    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="relative w-full" >
            <form onSubmit={handleSubmit(submit)}>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search..."
                    className="pl-10 bg-muted/50 border-border focus:border-ring"
                    {...register('searchInput', { required: "Please Enter a valid search input "})}
                />
            </form>
        </div>
    </div>
  )
}

export default SearchBox
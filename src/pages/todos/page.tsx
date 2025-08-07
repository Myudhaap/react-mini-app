import AddIcon from '@mui/icons-material/Add'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SearchIcon from '@mui/icons-material/Search'
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { category } from "../../constants/common"
import type { ITodo } from "../../interfaces/todo"
import type { AppDispatch, RootState } from "../../redux/store"
import { deleteTodos, getTodoById, getTodos, updateStatusTodo } from "../../redux/todos/todoSlice"
import { DialogForm } from "./components/DialogForm"
import { Link } from 'react-router-dom'



export interface IFilter{
    category: string;
    status: string;
    q: string;
}

export default function TodosPage(){
    const [filter, setFilter] = useState<IFilter>({
        category: '',
        status: '',
        q: ''
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()
    const {todos, loading} = useSelector((state: RootState) => state.todos)

    useEffect(() => {
        dispatch(getTodos(undefined))
    }, [])

    const onUpdateStatus = (todo: ITodo) => {
        dispatch(updateStatusTodo(todo.id))
    }

    const onDelete = (todo: ITodo) => {
        dispatch(deleteTodos(todo.id))
    }

    const onAdd = () => {
        setTitle('Add Form Todo')
        setIsOpen((prev) => !prev)
    }

    const onEdit = (todo: ITodo) => {
        if (todo.id) {
            dispatch(getTodoById(todo.id))
            setTitle('Edit Form Todo')
            setIsOpen((prev) => !prev)
        }
    }

    const onFilter = () => {
        dispatch(getTodos(filter))
    } 

    const onResetFilter = () => {
        setFilter({
            category: '',
            status: '',
            q: ''
        })
        setSearch('')
        dispatch(getTodos(undefined))
    }

    const onSearch = () => {
        setFilter((prev) => ({
            ...prev,
            q: search
        }))
        dispatch(getTodos(filter))
    }

    const onToggleDialogAdd = () => {
        setIsOpen((prev) => !prev)
    }

    const handleChange = (e: SelectChangeEvent, field: string) => {
        setFilter({
            ...filter,
            [field]: e.target.value,
        });
    };
    
    return (
        <div className="h-full bg-gray-100 p-6">
            <div className='flex items-center gap-4 mb-4'>
                <Link to={"/"}>
                    <ArrowBackIcon sx={{fontSize: 32, color: 'black'}}/>
                </Link>
                <Typography variant="h5">Todos List</Typography>
            </div>

            <div className="bg-white rounded-md p-4">
                <div className="flex justify-between mb-6">
                    <div className="flex-1 flex gap-4">
                        <FormControl sx={{width: '15rem'}}>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={filter?.category || ''}
                                label="Category"
                                onChange={(e) => handleChange(e, 'category')}
                            >
                                {category.map((cat) => (
                                    <MenuItem key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{width: '15rem'}}>
                            <InputLabel id="status">status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={filter?.status || ''}
                                label="status"
                                onChange={(e) => handleChange(e, 'status')}
                            >
                                <MenuItem value={'done'}>Done</MenuItem>
                                <MenuItem value={'onprogress'}>On Progress</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="info" startIcon={<FilterAltIcon/>} onClick={onFilter}>Filter</Button>
                        <Button variant="contained" color="error" startIcon={<RestartAltIcon/>} onClick={onResetFilter}>Reset Filter</Button>
                    </div>
                    <Button variant="contained" color="info" startIcon={<AddIcon/>} onClick={onAdd}>Add Todo</Button>
                </div>

                <div className="flex gap-4 mb-4">
                    <TextField sx={{width: '31rem'}} id="search" label="Search" variant="outlined" onChange={(e) => setSearch(e.target.value)}/>
                    <Button variant="contained" color="info" startIcon={<SearchIcon/>} onClick={onSearch}>Search</Button>
                </div>
                <div className="grid grid-cols-4 gap-4 rounded-md">
                    {loading ? Array.from({length: 10}, (_, i) => i).map((num: number) =>(
                            <Skeleton key={num} variant="rounded" height={200}/>
                    )) : (
                        <>
                            {todos.map((todo: ITodo) => (
                                <div
                                 key={todo.id}
                                 className="flex flex-col justify-between border border-blue-500 rounded-md p-4 h-[200px] hover:border-dashed"
                                >
                                    <div className="flex justify-between items-center">
                                        <Chip
                                         variant="filled"
                                         color={todo.status ? 'success' : 'default'} 
                                         label={todo.status ? 'Done' : 'On Progress'}
                                        />

                                        <div className="flex gap-4">
                                            {!todo.status && <EditIcon onClick={() => onEdit(todo)} color="info" sx={{cursor: 'pointer'}}/>}
                                            <DeleteIcon color="error" onClick={() => onDelete(todo)} sx={{cursor: 'pointer'}}/>
                                            {todo.status ? <CheckBoxIcon color="success" onClick={() => onUpdateStatus(todo)} sx={{cursor: 'pointer'}}/> : <CheckBoxOutlineBlankIcon onClick={() => onUpdateStatus(todo)} sx={{cursor: 'pointer'}}/>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <Typography variant="body1">{todo.text}</Typography>
                                        <Chip
                                         variant="filled"
                                         label={todo.category}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            <DialogForm isOpen={isOpen} onToggleOpen={onToggleDialogAdd} title={title}/>
        </div>
    )
}
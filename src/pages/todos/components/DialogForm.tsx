import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useFormik, type FormikErrors, type FormikTouched } from 'formik'
import type React from "react"
import * as Yup from 'yup'
import { category } from "../../../constants/common"
import type { ITodo, ITodoReq } from "../../../interfaces/todo"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../redux/store"
import { addTodos, resetTodo, updateTodos } from "../../../redux/todos/todoSlice"
import { useEffect } from "react"

interface IDialogFormProps {
    title: string;
    isOpen: boolean,
    onToggleOpen: () => void
}

export const DialogForm: React.FC<IDialogFormProps> = ({title,  isOpen, onToggleOpen }) => {
    const dispatch = useDispatch<AppDispatch>()
    const {loading, todo} = useSelector((state: RootState) => state.todos)

    useEffect(() => {
        if (todo != null && todo as ITodo ) {
            formik.setValues(todo)
        }
    }, [todo])

    const validationSchema = Yup.object({
        text: Yup.string().required('Text field is required'),
        category: Yup.string().required('Category field is required')
    })
    
    const formik = useFormik<ITodoReq>({
        initialValues: {
            text: '',
            category: ''
        },
        validationSchema,
        onSubmit: (values: ITodoReq) => {
            if (todo) {
                dispatch(updateTodos(values))
            } else {
                dispatch(addTodos(values))
            }
            onCloseDialog()
        }
    })

    const onCloseDialog = () => {
        dispatch(resetTodo())
        formik.resetForm()
        onToggleOpen()
    }

    const errors: FormikErrors<ITodoReq> = formik.errors
    const touched: FormikTouched<ITodoReq> = formik.touched

    return (
        <Dialog open={isOpen} onClose={onCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                 <TextField
                    fullWidth
                    id="text"
                    name="text"
                    label="Text"
                    margin="normal"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={touched.text && Boolean(errors.text)}
                    helperText={touched.text && errors.text}
                    />

                    <FormControl
                        fullWidth
                        margin="normal"
                        error={touched.category && Boolean(errors.category)}
                        >
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Category"
                        >
                            {category.map((cat) => (
                                <MenuItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </MenuItem>
                            ))}
                        </Select>
                            <FormHelperText>
                                {touched.category && errors.category}
                            </FormHelperText>
                        </FormControl>

                    <div className="flex gap-4">
                        <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={onCloseDialog}
                        >
                        Cancel
                        </Button>
                        <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}
                        disabled={loading || !formik.isValid}
                        >
                        Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
import { Link } from "react-router-dom"
import style from "./style.module.css"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material"
import { useState } from "react";
import { instance } from "../../api/baseUrl";

const CreateCardPage = () => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [importance, setImportance] = useState<number>(0);
    const [descripton, setDescription] = useState('')

    const handleImportanceChange = (event: Event, newValue: number | number[]) => {
        setImportance(newValue as number); 
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
            if (!type || !name || descripton.trim() === '') {
                console.error("Все поля обязательны для заполнения!")
                return
            }
            const cardData = {
                type,
                name,
                importance,
                descripton,
            };
            try {
                const response = await instance.post("cards/create", cardData);
                console.log('Успех', response.data)
            } catch (error) {
                console.error("Error creating card:", error);
                console.log(typeof(type));
                console.log(typeof(name));
                console.log(typeof(importance));
                console.log(importance);
                
                console.log(typeof(descripton));
                
            }
		}
    // console.log(name);
    
    return(
        <>
            <div className={style.box}>
                <h1>Создать карты</h1><Link to="/cards"><button>Список карт</button></Link>
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        maxWidth={640}
                        margin="auto"
                        padding={5}
                        borderRadius={5}
                        boxShadow={"5px 5px 10px #ccc"}
                    >
                        <FormControl fullWidth margin={"normal"}>
                            <InputLabel id="type-card-select-label">Type of cards</InputLabel>
                            <Select
                                labelId="type-card-label"
                                id="type-card-select"
                                value={type}
                                label="Type of cards"
                                onChange={(event) => setType(event.target.value)}
                            >
                                <MenuItem value={'Пол'}>Пол</MenuItem>
                                <MenuItem value={'Возраст'}>Возраст</MenuItem>
                                <MenuItem value={'Профессия'}>Профессия</MenuItem>
                                <MenuItem value={'Здоровья'}>Здоровья</MenuItem>
                                <MenuItem value={'Хобби'}>Хобби</MenuItem>
                                <MenuItem value={'Фобия'}>Фобия</MenuItem>
                                <MenuItem value={'Багаж'}>Багаж</MenuItem>
                                <MenuItem value={'Факт'}>Факт</MenuItem>
                            </Select>
                        </FormControl>
                        {type === 'Пол'? 
                            <FormControl fullWidth margin={"normal"}>
                                <InputLabel id="name-card-select-label">Sex</InputLabel>
                                <Select
                                    labelId="name-card-label"
                                    id="name-card-select"
                                    value={name}
                                    label="Sex"
                                    onChange={(event) => setName(event.target.value)}
                                >
                                    <MenuItem value={'Мужчина'}>Мужчина</MenuItem>
                                    <MenuItem value={'Женщина'}>Женщина</MenuItem>
                                </Select>
                            </FormControl>
                            :
                            <TextField 
                                id="outlined-basic" fullWidth={true}	
                                margin={"normal"} label="Name card" 
                                variant="outlined" 
                                onChange={(event) => setName(event.target.value)}
                            />
                        }
                        <Slider
                            aria-label="Small steps"
                            value={importance}
                            onChange={handleImportanceChange}
                            getAriaValueText={(value) => `${value}`}
                            step={1}
                            marks
                            min={-10}
                            max={10}
                            valueLabelDisplay="auto"
                        />

                        <TextField 
                            id="Description-basic" fullWidth={true}	
                            margin={"normal"} label="Description card" 
                            variant="outlined" 
                            onChange={(event) => setDescription(event.target.value)}
                        />

                        <Button
                            type="submit"
                            sx={{
                                fontFamily: "Poppins",
                                marginTop: 2,
                                marginBottom: 2,
                                width: "60%",
                            }}
                            variant="contained"
                        >
                            Create
                        </Button>
                        
                        
                    </Box>
                </form>
            </div>
        </>
    )
}

export default CreateCardPage
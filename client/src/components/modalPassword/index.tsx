

interface IModalPassword {
    setPas: (value: string) => void
}

const ModalPassword = (props: IModalPassword) => {
    const { setPas } = props;
    return(
        <div>
            <input type="text" placeholder="password" onChange={(e) => setPas(e.target.value)}/>
        </div>
    )
}

export default ModalPassword
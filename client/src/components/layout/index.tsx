import { ILayout } from "../../common/types/layout"

const LayoutComponent = ({children} : ILayout) => {
    return(
        <>
            {children}
        </>
    )
}

export default LayoutComponent
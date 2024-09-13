function ErrorPage({ message }) {

    return (
        <>
            <h2>{message}</h2>
            <br />
            <h2>3秒後自動登出...</h2>
        </>
    )

}

export default ErrorPage;
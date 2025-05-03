function ResultPage(props) {
    return <>
        <h1>ResultPage</h1>
        <button onClick={() => props.handler.confirmResult()}>Confirm</button>
    </>
}
export default ResultPage;
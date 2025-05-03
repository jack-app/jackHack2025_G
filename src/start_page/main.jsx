function StartPage(props) {
    return <>
        <h1>StartPage</h1>
        <button onClick={() => props.handler.startGame()}>Start Game</button>
    </>
}
export default StartPage;
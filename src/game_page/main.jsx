function GamePage(props) {
    return <>
        <h1>GamePage</h1>
        <button onClick={() => props.handler.endGame()}>End Game</button>
    </>
}
export default GamePage;
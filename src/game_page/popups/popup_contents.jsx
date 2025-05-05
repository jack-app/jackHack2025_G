export function RandomContent() {
    const options = [
        <SampleContent/>,
    ]
    return options[Math.floor(Math.random() * options.length)];
}

function SampleContent() {
    return <p>Sample Content</p>
}

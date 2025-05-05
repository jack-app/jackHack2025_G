export function SkillItem({children, onClick}) {
    return <div class="skill-item" onClick={onClick}>
        {children}
    </div>
}
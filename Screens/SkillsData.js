export function SkillsData(){
    return [
        {"title": "Self Management", "rank":"1", "id":"0"},
        {"title": "Social Awareness", "rank":"2", "id":"1"},
        {"title": "Innovation", "rank":"3", "id":"2"},

    ]
}
export function renderSkillsTitle(state, val) {
    return (
        state.title.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
}
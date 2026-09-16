export function handleSelectDefaultOrOther(
    setSelectOtherList: React.Dispatch<React.SetStateAction<boolean>>
) {
        setSelectOtherList((prevState) => !prevState);
}
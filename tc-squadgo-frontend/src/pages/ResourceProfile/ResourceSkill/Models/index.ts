import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ResourceProfileParams, SkillProps } from "../interfaces"
import { useAuth } from "../../../../context/AuthContext"
import { handleLoadSkillPoints } from "../functions/handles/handleLoadSkillPoints"
import { handleOnRate } from "../functions/handles/handleOnRate"
import { skillByType } from "../functions/utils/skillByType"
import { skillChartByType } from "../functions/services/skillChartByType"
import { handleSetSkillChartFilters } from "../functions/handles/handleSetSkillChartFilters"
import { keyValues } from "../functions/utils/keyValues"
import { handleChangeSoftSwitchValue } from "../functions/handles/handleChangeSoftSwitchValue"
import { handleChangeHardSwitchValue } from "../functions/handles/handleChangeHardSwitchValue"

export const useSkill = () => {
    const { resource_id } = useParams<ResourceProfileParams>()
    const { hasPermissions } = useAuth()

    const [enableSkillsUpdate, setEnableSkillsUpdate] = useState(false)
    const [geralSoftSkillsUpdate, setGeralSoftSkillsUpdate] = useState(false)
    const [geralHardSkillsUpdate, setGeralHardSkillsUpdate] = useState(false)
    const [skills, setSkills] = useState<SkillProps[]>([])
    const [skillsChartFiltered, setSkillsChartFiltered] = useState<SkillProps[]>([])
    const [loading, setLoading] = useState(true)
    const [startValueSoftSkillSwitch, setStartValueSoftSkillSwitch] = useState(0)
    const [startValueHardSkillSwitch, setStartValueHardSkillSwitch] = useState(0)


    useEffect(() => {
        handleLoadSkillPoints(
            resource_id,
            setSkills, 
            setSkillsChartFiltered,
            setLoading)
    }, [resource_id])


    const handles = {
        handleLoadSkillPoints:(
            resource_id: string,
            setSkills: React.Dispatch<React.SetStateAction<SkillProps[]>>,
            setSkillsChartFiltered: React.Dispatch<React.SetStateAction<SkillProps[]>>,
            setLoading: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleLoadSkillPoints(
            resource_id,
            setSkills, 
            setSkillsChartFiltered,
            setLoading
        ),

        handleOnRate:(
            id: number, 
            point: number,
            skills: SkillProps[],
            setSkills: React.Dispatch<React.SetStateAction<SkillProps[]>>,
            setSkillsChartFiltered: React.Dispatch<React.SetStateAction<SkillProps[]>>,
            resource_id: string
        ) => handleOnRate(
            id, 
            point,
            skills,
            setSkills,
            setSkillsChartFiltered,
            resource_id
        ),

        handleSetSkillChartFilters:(
            id: number,
            skills: SkillProps[],
            skillsChartFiltered: SkillProps[],
            setSkillsChartFiltered: React.Dispatch<React.SetStateAction<SkillProps[]>>
        ) => handleSetSkillChartFilters(
            id, 
            skills,
            skillsChartFiltered,
            setSkillsChartFiltered
        ),

        handleChangeSoftSwitchValue:(
            event: React.ChangeEvent<HTMLInputElement>,
            startValueSoftSkillSwitch: number,
            setStartValueSoftSkillSwitch: React.Dispatch<React.SetStateAction<number>>,
            setGeralSoftSkillsUpdate: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleChangeSoftSwitchValue(
            event,
            startValueSoftSkillSwitch,
            setStartValueSoftSkillSwitch,
            setGeralSoftSkillsUpdate
        ),

        handleChangeHardSwitchValue:(
            event: React.ChangeEvent<HTMLInputElement>,
            startValueHardSkillSwitch: number,
            setStartValueHardSkillSwitch: React.Dispatch<React.SetStateAction<number>>,
            setGeralHardSkillsUpdate: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleChangeHardSwitchValue(
            event, 
            startValueHardSkillSwitch,
            setStartValueHardSkillSwitch,
            setGeralHardSkillsUpdate
        )
    }

    const utils = {
        skillByType:(
            type: string, skills: SkillProps[]
        ) => skillByType(
            type, skills
        ),

        keyValues:(
            type: string,
            skillsChartFiltered: SkillProps[]
        ) => keyValues(
            type, 
            skillsChartFiltered
        )
    }

    const services ={
        skillChartByType:(
            type: string,
            skillsChartFiltered: SkillProps[]
        ) => skillChartByType(
            type,
            skillsChartFiltered
        )
    }

    return {
        states: {
            enableSkillsUpdate, 
            setEnableSkillsUpdate,
            geralSoftSkillsUpdate, 
            setGeralSoftSkillsUpdate,
            geralHardSkillsUpdate, 
            setGeralHardSkillsUpdate,
            skills, 
            setSkills,
            skillsChartFiltered, 
            setSkillsChartFiltered,
            loading, 
            setLoading,
            startValueSoftSkillSwitch, 
            setStartValueSoftSkillSwitch,
            startValueHardSkillSwitch, 
            setStartValueHardSkillSwitch
        },

        resource_id ,
        hasPermissions,
        handles,
        services,
        utils
    }
}
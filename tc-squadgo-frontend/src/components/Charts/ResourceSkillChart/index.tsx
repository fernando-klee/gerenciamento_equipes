import { ResponsiveRadar } from '@nivo/radar'

interface ResourceSkillProps {
    data: {
        [key: string]: number
    }[]
}

const ResourceSkillChart: React.FC<ResourceSkillProps> = ({ data }) => {
    return (
        <ResponsiveRadar
            data={data}
            keys={[ 'Pontuação' ]}
            indexBy="skill"
            valueFormat=">-.0f"
            maxValue={5}
            margin={{ top: 50, right: 50, bottom: 70, left: 50 }}
            borderColor="#4db2fe"
            gridLabelOffset={40}
            dotSize={8}
            dotColor="#4db2ff"
            dotBorderColor="#58aefe"
            colors={{ scheme: 'paired' }}
            fillOpacity={0.6}
            blendMode="darken"
            motionConfig="wobbly"
            theme={{
                fontSize: 14,
                textColor: '#929292',
            }}
        />
    )
}

export default ResourceSkillChart
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
type Props = {
    stars: number
}

const Stars: React.FC<Props> = (props: Props) => {
    const nums = [1, 2, 3, 4, 5]
    return (
        <div className="stars">
            {
                nums.map((num) => (
                    <AiFillStar key={num} size={20} style={{ color: props.stars >= num ? '#FDD33D': '#CDCCC8'}} />
                ))
            }
        </div>
    )
}

export default Stars
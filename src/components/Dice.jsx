import React from 'react'

export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#a8dadc" : "#f1faee"
    }

    return (
        <div
            className='dice'
            style={styles}
            onClick={props.holdDice}
        >
            {props.value}
        </div>
    )
}
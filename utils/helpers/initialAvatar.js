import React from 'react';
import styled from "styled-components";


export const InitialAvatar = props => {


    const getInitials = (firstName, lastName) => {
        if (!props.firstName || !props.lastName) {
            return "HI"
        }
        const firstPlusLast = firstName.slice(0,1) + lastName.slice(0,1);
        return firstPlusLast;
    }
    const initials = getInitials(props.firstName, props.lastName);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const randomColorBg = getRandomColor();
    const randomColorFg = getRandomColor();

    const getDimensions = heightOrWidth => {
        if (heightOrWidth) {
            const output = heightOrWidth;
            return output
        }
        return "40"
    };
    const finalHeight = getDimensions(props.height);
    const finalWidth = getDimensions(props.width);

    const getFontSize = (tall, wide) => {
        if (tall && wide) {
            const output = (Number(tall) + Number(wide)) / 2;
            return Math.ceil(output * 0.5);
        }
        return "16"
    }
    const finalFontSize = getFontSize(finalHeight, finalWidth);


    const Avatar = styled.div`
        height: ${finalHeight + "px"};
        width: ${finalWidth + "px"};
        font-size: ${finalFontSize + "px"};
        border-radius: 100%;
        background-color: ${props.useRandomColor ? randomColorBg : "rgba(230,230,230,1)"};
        color: ${props.useRandomColor ? randomColorFg : "black"};
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Roboto";
        font-weight: bold;
        letter-spacing: 2px;
        margin: 0 auto;
    `
    return <Avatar>{initials}</Avatar>;
}

import styled from "styled-components";
import { Link } from "react-router-dom";


export const AuthButton = styled.button`
    font-size: 1.5rem;
    color: #F0EFFB;
    background-color: #B5179E;
    padding: 0.75rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    transition: all 0.3s ease-in-out;

    &:hover{
        background-color: #F0EFFB;
        color: #B5179E;
        border: 1px solid #B5179E;

    }
`
export const AuthLink = styled(Link)`
    text-decoration: none;
    font-size: 1.25rem;
    color: #F0EFFB;
    background-color: #560BAD;
    padding: 0.75rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    transition: all 0.3s ease-in-out;

    &:hover{
        background-color: #F0EFFB;
        color: #560BAD;
        border: 1px solid #560BAD;

    }
`
export const AuthLinkContainer = styled.h3`
    margin-bottom: 1.5rem;
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

export const NoteContainer = styled.div`
    padding: 1rem;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    border: 2px solid #FF5A5F;
    border-radius: 10px;

    p{
        margin-bottom: 0.75rem;
    }

    li{
        font-weight: bold;
    }
`
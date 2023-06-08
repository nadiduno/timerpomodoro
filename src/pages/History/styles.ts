import styled from "styled-components";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
`

export const HistoryList = styled.div`
    flex:1;
    overflow: auto;
    margin-top: 2rem;
    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
        th{
            background-color: ${(props) => props.theme['gray-600']};
            color: ${(props) => props.theme['gray-100']};
            padding: 1rem;
            text-align: left;
            font-size: 0.875rem;
            line-height: 1.6;
        &:first-child{
            border-top-left-radius: 8px;
            padding-left: 1.5rem;
        }
        &:last-child{
            border-top-right-radius: 8px;
            padding-right: 1.5rem;
        }
        }
    td{
        background-color: ${(props) => props.theme['gray-200']};
        color: ${(props) => props.theme['gray-500']};
        border-top: 4px solid ${(props) => props.theme['pastel-100']};
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.6;
        &:first-child{
            width: 50%;
            padding-left: 1.5rem;
        }
        &:last-child{
            padding-right: 1.5rem;
        }
    }
    }
`
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        font-family: 'Roboto' !important;
    }

    .profile-menu-active {
        background: #fff;
        box-shadow: 0px 1px 7px 1px rgba(0,0,0,0.2);
    }

    .itemActive > .active{
        position: absolute;
        left: -22px;
        width: 6.15px;
        height: 85%;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background: white;
    }

    .itemActive:hover > .active{
        display: none;
    }
`
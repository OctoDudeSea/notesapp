<template>
    <div>
        <div class="about-row">
            <div>
                <img src="../assets/code-typing.png" alt="">
            </div>
            <div>
                <h1>About notesapp</h1>
                <p>This is an application meant to showcase the utility of vue along side node.js with the express.js framework. Thanks to everybody who has made the extensions and libraries used in this project and to all the online resources used to achive this.As follows i will link some of the more important resources i have used:</p>
            </div>
        </div>
        <div class="videos-row">
            <div>
                <h2>Vue.js Tutorial: Beginner to Front-End Developer</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/1GNsWa_EZdw?si=2183dWsavTIBz3z8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div>
                <h2>CRUD API Tutorial – Node, Express, MongoDB</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/_7UQPve99r4?si=xKynkFToRH76b_vY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .about-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .videos-row {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        text-align: center;
        flex-wrap: wrap;
    }

    img {
        width: 20em;
        height: 20em;
        margin: 2em;
    }

    @media screen and (max-width: 670px) {
        .about-row{
            flex-direction: column;
        }
    }
</style>
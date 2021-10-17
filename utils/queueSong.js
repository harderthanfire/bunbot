const ytcog = require("ytcog");
module.exports = async function (client, interaction, playQuery) {
    let text = "Add to queue failed";

    const url = isYoutube(playQuery) ? getYoutubeId(playQuery) : playQuery;
    const session = new ytcog.Session([
        "VISITOR_INFO1_LIVE=6cktYzA0x3Y; SID=DAjJhNFaPutu8_wHh_HPlLHm3qVmlP4TadrguA5YjQy_5fcxKfdVEWm3tQaDNcRJPyk6Xg.; __Secure-3PSID=DAjJhNFaPutu8_wHh_HPlLHm3qVmlP4TadrguA5YjQy_5fcx_8jkWWCD8YxcP92q9_W48A.; HSID=A9VoDHSQwweHTcwli; SSID=A_n2RNHriY14wbY3E; APISID=blgVLLuJt7zPUXno/ACWVY89mg1NQ9IT1K; SAPISID=9dRUrpHWVkADP3QM/A27LB6WwTowQDoa5R; __Secure-3PAPISID=9dRUrpHWVkADP3QM/A27LB6WwTowQDoa5R; CONSENT=YES+cb.20210907-07-p1.en+FX+464; LOGIN_INFO=AFmmF2swRQIgOh-Zx8G_avGjMSCuC5_sgs_tqhRyaCvqAYDkpiYG38UCIQDZboxSePTwwoxULi…bmM4VWg0eEM0YmpZaFJjek45TlZVbm11T29HWUlz; PREF=f6=40000080&volume=100&tz=Europe.London&library_tab_browse_id=FEmusic_library_privately_owned_artists&al=en-GB&f5=30000; SIDCC=AJi4QfEEEKzt0zZL_-WCnMbk_3QoBsdgyNNi_-ZnSi2tf3K_KDsky2-ijNusCb2KzQaUG-KvFnC4; __Secure-3PSIDCC=AJi4QfFcK9UWw35XlB_PQziEJ-cJEilKah7PvKQNtpX3t0Gx9H-Uzf8s-y-B7nEH1hGUJNG9MFk; __Secure-1PSID=DAjJhNFaPutu8_wHh_HPlLHm3qVmlP4TadrguA5YjQy_5fcx9FAjhTHepgTKBDIL30GLwg.; __Secure-1PAPISID=9dRUrpHWVkADP3QM/A27LB6WwTowQDoa5R; YSC=WgSaV1VFe1Y; wide=0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
    ]);
    const song = {
        video: null,
        title: null,
        duration: null,
        requester: interaction.member.displayName,
    };
    await session.fetch();
    const searchOptions = {
        query: url,
        items: "videos",
        period: "any",
        quantity: 1,
    };

    const search = new ytcog.Search(session, searchOptions);
    await search.fetch(searchOptions);
    if (search.videos && search.videos.length) {
        const video = search.videos[0];
        const videoOption = {
            id: video.info().options.id,
            container: "wemb",
            videoQuality: "none",
            audioQuality: "highest",
            mediaBitrate: "highest",
            metadata: "author,title",
        };
        await video.fetch([videoOption]);
        //  const audioUrl = video.info().audioStreams[0].url;
        song.video = video;
        song.title = video.info().title;
        song.duration = secondsToTime(video.info().duration);
    }

    if (song.video) {
        text = "queued " + song.title + " (" + song.duration + ")";
        client.queue.push(song);
    }

    await interaction
        .reply({
            content: interaction.member.displayName + ": " + text,
        })
        .catch((e) => {
            console.log(e);
        });
};

function secondsToTime(time) {
    const minutes = "0" + ~~(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}

function getYoutubeId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return url;
    }
}

function isYoutube(url) {
    return /youtu(\.?)be/.test(url);
}

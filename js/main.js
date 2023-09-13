const elList = document.querySelector(".js-list");
const template =document.querySelector(".js-template");
const regions =document.querySelector(".hero__sellect");
const regionbtn = document.querySelector(".day")
const errormessage = document.querySelector(".hero__error-message");
const regionName = document.querySelector(".hero__region-name");
const btnwrapp = document.querySelector(".hero__btn-wrapper");
const week = document.querySelector(".weeek");
const month = document.querySelector(".month");
const nowDate = document.querySelector(".hero__day")

async function getTime(url) {
    try {
        const response = await fetch(url);
        const data =await response.json();
        console.log(data.times.asr.slice(0,2));
        const templateClone = template.cloneNode(true).content;
      
        const bomdod = templateClone.querySelector(".bomdod-time");
        bomdod.textContent = data.times.tong_saharlik;
        bomdod.setAttribute("datetime",`${data.times.tong_saharlik}`)

        const peshin = templateClone.querySelector(".peshin-time");
        peshin.textContent = data.times.peshin;
        peshin.setAttribute("datetime",`${data.times.peshin}`)

        const asr = templateClone.querySelector(".asr-time");
        asr.textContent = data.times.asr;
        asr.setAttribute("datetime",`${data.times.asr}`)

        const shom = templateClone.querySelector(".shom-time");
        shom.textContent = data.times.shom_iftor;
        shom.setAttribute("datetime",`${data.times.shom_iftor}`)

        const xufton = templateClone.querySelector(".xufton-time");
        xufton.textContent = data.times.hufton;
        xufton.setAttribute("datetime",`${data.times.hufton}`)

        elList.append(templateClone);
        nowDate.textContent = `Sana: ${data.date}`;
    } catch (error) {
        console.log(error);
        regionName.style.color = "red";
        regionName.textContent =`!!! Kechirasz bizda ${regions.value} viloyati bo'yicha malumotlar yo'q !!!`;
    }
}

getTime(" https://islomapi.uz/api/present/day?region=Farg'ona");


btnwrapp.addEventListener("click",evt => {
    if (evt.target.matches(".day")) {
        elList.innerHTML = "";
        if (!regions.value) {
            alert("viloyatni tanlang"); 
            regionName.style.display = "none"
            return
        }
        regionName.style.display = "block"
        getTime(` https://islomapi.uz/api/present/day?region=${regions.value}`);
        regionName.textContent = `${regions.value} viloyati`;
        regionName.style.color ="#fff";
    }else if(evt.target.matches(".week")) {
       window.location.pathname = "./week.html"
    }else if(evt.target.matches(".month")) {
        window.location.pathname = "./month.html"
    }
});

const new_date = new Date();
const nowday = new_date.getHours();
console.log(nowday);


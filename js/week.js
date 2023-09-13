const eltabelBody = document.querySelector(".hero__table-body");
const eltabelTempalte = document.querySelector(".hero__tabel-template");
const eltabelFragment = document.createDocumentFragment();
const title = document.querySelector(".js-tabel-title");
const btnWrapper = document.querySelector(".hero__btn-wrapper");
const regions = document.querySelector(".hero__sellect");

async function getWeekTime (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        render(data,eltabelBody);
        btnWrapper.addEventListener("click", evt => {
            if (evt.target.matches(".week")) {
                // title.textContent = `${date.flat().region} viloyatini ${item.date} sanadagi taqvimi`;
                if(!regions.value) {
                    alert("viloyatni tanlamadiz");
                    return;
                }
                title.style.color = "#fff";
                title.textContent = `${regions.value} viloyati taqvimi` 
                getWeekTime(`https://islomapi.uz/api/present/week?region=${regions.value}`);
                
            }
            if (evt.target.matches(".day")) {
                window.location.pathname = "./index.html"
            }
            if (evt.target.matches(".month")) {
                window.location.pathname = "./month.html"
            }
        })
        if (data.length === 0) {
            title.style.color = "red"
            title.textContent = `!!! Kechirasz bizda ${regions.value} haqida malumot yo'q !!!`;
            console.log(`saa`);
        }
    } catch (error) {
        console.log(error);
    }
    
    
} 

getWeekTime("https://islomapi.uz/api/present/week?region=Farg'ona");

function render(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const tabelTemplateClone = eltabelTempalte.cloneNode(true).content;
        const week = tabelTemplateClone.querySelector(".weekday");
        week.textContent = item.weekday;
        
        const bomdod = tabelTemplateClone.querySelector(".bomdod");
        bomdod.textContent = item.times.tong_saharlik;
        
        const peshin = tabelTemplateClone.querySelector(".peshin");
        peshin.textContent = item.times.peshin;
        
        const asr = tabelTemplateClone.querySelector(".asr");
        asr.textContent = item.times.asr;
        
        const shom = tabelTemplateClone.querySelector(".shom");
        shom.textContent = item.times.shom_iftor;
        
        const xufton = tabelTemplateClone.querySelector(".xufton");
        xufton.textContent = item.times.hufton;
        
        const date = tabelTemplateClone.querySelector(".date");
        date.textContent = item.date.slice(0,9);
        eltabelFragment.append(tabelTemplateClone);
        
        
    });
    node.append(eltabelFragment)
}

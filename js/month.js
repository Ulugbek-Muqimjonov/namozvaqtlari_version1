const elList = document.querySelector(".hero__list")
const regions = document.querySelector(".hero__sellect-region");
const sellectDay = document.querySelector(".hero__sellect-day");
const sellectMonth = document.querySelector(".hero__sellect-month");
const btnWrapp = document.querySelector(".hero__btn-wrapper");
const eltabelTempalte = document.querySelector(".js-template");
const elSomeMessage = document.querySelector(".hero__some-message");
const eltabelFragment = document.createDocumentFragment();
async  function  getMonthTime(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const findDay = data.find(item => {
            return item.day == sellectDay.value;
        })
        if (findDay == null) {
            elSomeMessage.textContent = `!!! Kechirasiz bizda ${regions.value} viloyatiga oid malumot yo'q`;
        }else {
            elSomeMessage.style.color = "#fff";
            elSomeMessage.textContent =`${regions.value} viloyat taqvimi`;
        }

        
        const tabelTemplateClone = eltabelTempalte.cloneNode(true).content;
        const bomdod = tabelTemplateClone.querySelector(".bomdod-time");
        bomdod.textContent = findDay.times.tong_saharlik;
        bomdod.datetime = findDay.times.tong_saharlik;
        
        const peshin = tabelTemplateClone.querySelector(".peshin-time");
        peshin.textContent = findDay.times.peshin;
        peshin.datetime = findDay.times.peshin;
        
        const asr = tabelTemplateClone.querySelector(".asr-time");
        asr.textContent = findDay.times.asr;
        asr.datetime = findDay.times.asr;
        
        const shom = tabelTemplateClone.querySelector(".shom-time");
        shom.textContent = findDay.times.shom_iftor;
        shom.datetime = findDay.times.shom_iftor;
        
        const xufton = tabelTemplateClone.querySelector(".xufton-time");
        xufton.textContent = findDay.times.hufton;
        xufton.datetime = findDay.times.hufton;
        

        console.log(findDay);
        eltabelFragment.append(tabelTemplateClone);
        elList.append(eltabelFragment)
    } catch (error) {
        console.log(error);
    }
};

btnWrapp.addEventListener("click",evt => {
    if (evt.target.matches(".month")) {
        if (regions.value == 0 || sellectDay.value == 0 || sellectMonth.value == 0) {
            alert(`Iltimos barcha soralgan qiymatlarni kiriting !!!`);  
        }
        elList.innerHTML ="";
        getMonthTime(`https://islomapi.uz/api/monthly?region=${regions.value}&month=${sellectMonth.value}&day=${sellectDay.value}`);
    }
    if (evt.target.matches(".day")) {
        window.location.pathname = "./index.html";
    }
    if (evt.target.matches(".week")) {
        window.location.pathname = "./week.html";
    }
})



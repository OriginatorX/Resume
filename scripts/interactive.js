'use strict'

previewPage().hideAfter(3600)
modalWindow().animateShow()
window.onscroll = () => {
    pageScroll()
        .addShadowToExperienceBlock()
        .showProjectsList(65, 35)
}

//Simple scripts for page interactive
function previewPage() {
    let [previewElem] = elementById('preview-id')
    return {
        hideAfter(time = 5000) {
            setTimeout(() => {
                document.body.classList.remove('no-scroll_mode')
                previewElem.classList.remove('preview_show')
            }, time)
        }
    }
}

function modalWindow() {
    let [contactsBtn, modalElem, modalContactsElem] = elementById(
        'contacts-id',
        'modal-id',
        'modal__contacts-id'
    )
    return {
        animateShow() {
            contactsBtn.onclick = function openModal() {
                modalElem.classList.add('modal_show')
                document.body.classList.add('no-scroll_mode')
            
                modalElem.onclick = function closeModal() {
                    modalElem.classList.remove('modal_show')
                    document.body.classList.remove('no-scroll_mode')
                }
                modalContactsElem.onclick = (event) => {
                    event.stopPropagation()
                }
            }
        }
    }
}

function pageScroll() {
    let [experienceElem, personalDescElem, projectsListElem] = elementById(
        'experience-id',
        'personal-description-id',
        'projects__list-id'
    )
    return {
        addShadowToExperienceBlock() {
            if (window.scrollY >= 1) {
                experienceElem.classList.add('experience_active')
                changeState(personalDescElem, true, 'personal-description__content_move')
            } else {
                experienceElem.classList.remove('experience_active')
                changeState(personalDescElem, false, 'personal-description__content_move')
            }
            return this
        },
        
        showProjectsList(showAfter = 70, hideBefore = 35) {
            let height = window.visualViewport.height
            if (window.scrollY >= inPercent(showAfter, height)) {
                projectsListElem.classList.add('projects__list_active')
            }
            if (window.scrollY <= inPercent(hideBefore, height)) {
                projectsListElem.classList.remove('projects__list_active')
            }
            return this
        }
    }
}

// Auxiliary functions

function elementById(...identificators) {
    let elementsList = []
    for (let id of identificators) {
         elementsList.push(document.getElementById(id))
    }
    return elementsList  
}

function inPercent(percents, pexels) {
    return (pexels / 100) * percents
}

function changeState(elem, isOn, prop) {
    if (isOn === true) {
        elem.classList.add(prop)
    } else {
        elem.classList.remove(prop)
    }
}
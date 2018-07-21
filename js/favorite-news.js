// Init UI
const ui = new UI();
// Api key
const apiKey = "c470735f5d6143a9a09869bf563b8eae";
// Init Auth
const auth = new Auth();
// Init Favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();
// Init elements
const newsContainer = document.querySelector('.news-container');
const logout = document.querySelector(".logout");
const allNews = document.querySelector(".news");


// по загрузке страницы получить все новости избранные
window.addEventListener("load", onLoad);
newsContainer.addEventListener('click', onDelete);
logout.addEventListener("click", onLogout);
allNews.addEventListener("click", goToAllNews);

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = 'login.html';
    }
});

function onLoad(e) {
    // получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {
            favoriteNews.forEach((doc ) => {
                console.log(`${doc.id}`);
                console.dir(doc.data());
                // выводим в разметку
                ui.addFavoriteNews(doc.data(), doc.id);
            });
        })
        .catch(err => {
            console.log(error);
        });
}

function onDelete(e){
    news.removeFavoriteNews(e.target.dataset.id)
        .then(() => {
            e.target.closest('.card').remove();
            M.toast({html: 'Новина успішно видалена'});
            if (!newsContainer.innerText) ui.showInfo('Немає збережених новин');
        });
}

function onLogout() {
    ui.showLoader();
    auth.logout()
        .then(() => window.location = 'login.html');
}

function goToAllNews() {
    ui.showLoader();
    window.location = 'index.html';
}

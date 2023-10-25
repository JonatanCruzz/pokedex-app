const paginateData = (items, currentPage) => {
    //?Cantidad de items por pagina
    const ITEMS_PER_PAGE = 20

    //ITEMS PÁGINA ACTUAL
    const sliceEnd = currentPage * ITEMS_PER_PAGE
    const sliceStart = sliceEnd - ITEMS_PER_PAGE
    const itemsInCurrentPage = items.slice(sliceStart, sliceEnd)

    // ULTIMA PAGINA O CANTIDAD DE PAGINAS
    const lastPage = Math.ceil(items.length / ITEMS_PER_PAGE)

    //BLOQUE ACTUAL
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //PAGINAS Q SE VAN A MOSTRAR EN EL BLOQUE ACTUAL
    const pagesInCurrenBlock = []
    const maxPage = actualBlock * PAGES_PER_BLOCK
    const minPage = (maxPage - PAGES_PER_BLOCK) + 1

    for(let i = minPage; i <= maxPage; i++){
        if(i <= lastPage){
             pagesInCurrenBlock.push(i)
        }
    }
    return{
        itemsInCurrentPage,
        pagesInCurrenBlock,
        lastPage,
    }
}

export {
    paginateData
}
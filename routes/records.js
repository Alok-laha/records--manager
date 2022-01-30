const router = require('express').Router();
const fetch = require('node-fetch');
const data = require('../data');

router.get('/records', (req, res) => {
    return res.status(200).send(data);
});


router.get('/managed-records/:page', async (req, res) => {
    try {

        // Internally calling records API
       const response = await fetch(`http://localhost:5000/api/records`);
       let data = await response.json();

       /*Ids: An array containing the ids of all items returned from the request.

        Open: An array containing all of the items returned from the request that have a disposition value of "open".

        ClosedCount: The total number of items returned from the request that have a disposition value of "closed" and 
        contain a primary color.

        PreviousPage: The page number for the previous page of results, or null if this is the first page.

        NextPage: The page number for the next page of results, or null if this is the last page. */
        
        let currPage = req.params.page - 1;
        let start = currPage * 10; 
        data = data.slice(start, start + 10);
        let Ids = [];
        data.forEach(element => {
            Ids.push(element.id);
        });

        // Open docs
        let open = data.filter(element => element.disposition === 'open');
        // closed docs
        let ClosedCount = data.filter(element => element.disposition === 'closed' && element.color !== '');

        let PreviousPage = +req.params.page === 1 ? null: +req.params.page - 1;
        let NextPage = data.length !== 10 ? null: +req.params.page + 1;

       return res.status(200).send({Ids, open, ClosedCount: ClosedCount.length, PreviousPage, NextPage});
    } catch (error) {
        console.log(error.message);
        return res.status(504).send({message: 'Something went wrong. Please try again.'});
    }
});


module.exports = router;
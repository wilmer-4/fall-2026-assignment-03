import { Router } from 'express';
import { createTicket, getAllTickets, getTicketById, updateTicketStatus } from '../dal/tickets.js';
import authMiddleware from '../middleware/auth.js';
import { getTotalHoursForTicket, insertTimeLog } from '../dal/timeLogs.js';


const router = Router();

// GET /tickets
//get all tickets
router.get('/', async function (req, res) {
    const { limit, offset, status } = req.query;
    const tickets = await getAllTickets({ 
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined, 
        status: status ? '' + status : undefined,
    });
    return res.json(tickets);
    })
    // GET /tickets/:id
    // get single ticket via id
router.get('/:id', async function (req, res) {
    const { id } = req.params
    const idNum = +id;
    const ticket = await getTicketById(idNum);
    if (ticket === undefined) { 
        return res.status(404).json({error: 'Not Found'})
    } else { 
        return res.json(ticket)
    }
})
// POST /tickets
//create new ticket
router.post('/', authMiddleware, async function (req, res) {
    const creator_id = res.locals.userId
    const { title, description } = req.body;
    const tickets = await createTicket({ title, description, creator_id });
    return res.status(201).json(tickets);
});

// PATCH /tickets/:id/status
//update the ticket
router.patch('/:id/status', authMiddleware, async function (req, res) {
    const { id } = req.params;
    const idNum = +id;
    const { status } = req.body;
    const updatedTicket = await updateTicketStatus( idNum, status  );
    return res.status(200).json(updatedTicket)

});

// POST /tickets/:id/time
//add timelog to ticket
router.post('/:id/time', authMiddleware, async function (req, res) {
    const { id } = req.params;
    const idNum = +id;
    const { hours } = req.body;
    await insertTimeLog(idNum, res.locals.userId, hours);
    return res.status(201).send();


})
// GET /tickets/:id/time
//get total hours on a ticket
router.get('/:id/time', async function (req, res) {
    const { id } = req.params;
    const idNum = +id;
    const totalHours = await getTotalHoursForTicket(idNum);
    return res.json({
        ticket_id: idNum,
        total_hours: totalHours
    });
    
});

export default router;

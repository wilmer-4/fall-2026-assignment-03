import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';
import { userInfo } from 'os';

describe('Part 1: API Integration Tests', () => {
  //it('should pass placeholder test', () => {
    // TODO: Student implementation - Part 1: Integration Testing
    // Test user creation (POST /users)
  it('should create user', async () => {
      const response = await request(app)
      .post('/users')
      .set('X-User-Id', '1')
      .send({
        name: 'user',
        email: 'user@user.com'
      });
      expect(response.status).toBe(201);
    });
  
    // Test ticket creation (POST /tickets)
  it('should create ticket', async () => {
    await request(app)
    .post('/users')
    .set('X-User-Id', '1')
    .send({
      name: 'creator',
      email: 'creator@creator.com'
    });

    const response = await request(app)
    .post('/tickets')
    .set('X-User-Id', '1')
    .send({
      title: 'test',
      description: 'test ticket'
    });
    expect(response.status).toBe(201);
  });
    // Test auth middleware rejection (401 when X-User-Id is missing or invalid)
  it('should handle middleware rejection', async () => {
    const response = await request(app)
    .post('/users')
    .send({
      name: 'user',
      email: 'user@user.com'
    })
    expect(response.status).toBe(401);
  });
    // Test 404 responses for non-existent users and tickets
  it('should handle nonexistant user', async () => {
    
    const response = await request(app)
    .get('/user/12');

    expect(response.status).toBe(404);
});
  it('should handle nonexistant ticket', async () => {
    
    const response = await request(app)
    .get('/tickets/12');

    expect(response.status).toBe(404);
});

  it('should have pignattion logic', async () => {
    const response = await request(app)
    .get('/tickets?limit=10&offset=0');

    expect(response.status).toBe(200);
  });
    // Test pagination and filtering on GET /tickets
    //expect(true).toBe(true);
  });

//});

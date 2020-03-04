import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import {SignLogService, login} from './sign-log.service'
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';

  
describe('Description', () => {
    let successresponse: string;
    let userconfigdata: login ={username:"@JJHerms", userpassword:"12345"}

    let signLogService : SignLogService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[SignLogService]
            
        })

        httpTestingController = TestBed.get(HttpTestingController);
        signLogService = TestBed.get(signLogService)
    });
    
    it('should return success response body', async(done:DoneFn) => {
        await signLogService.getTokens_login("JJHerms","12345").subscribe(data => {
            console.log(data)
            expect(data).toBeTruthy();
            done();
        })
    });

    afterEach(()=> {
        httpTestingController.verify();
    });
});

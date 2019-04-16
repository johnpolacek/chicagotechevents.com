const deferred = require('./deferred')

describe('SubmitEvent', function () {

	it('can get to submit event form from homepage', function() {
		cy.visit('/')
		cy.get('a').contains('Submit an Event').click()
		cy.location('pathname', {timeout: 10000}).should('include', '/submit')
		cy.get('form input[value="Submit Event"]', { timeout: 10000 }).should('exist')
	})

	describe('when submitting event', function() {
		
		const validEventData = {
			eventName: 'Test Event',
			description: 'This is not a real event. It is just for testing',
			linkURL: 'https://eventbrite.com/test-event',
			cost: 'FREE',
			locationName: '1871 Chicago',
			locationStreet: '222 W Merchandise Mart Plaza #1212',
			authorName: 'Joe Tester',
			authorEmail: 'joe@test.com',
			startDate: getTestEventDate(),
			startTime: '5:00pm',
			endDate: getTestEventDate(),
			endTime: '7:00pm'
		}

		function getTestEventDate() {
			const now = new Date();
			if (now.getMonth() == 11) {
			    return new Date(now.getFullYear() + 1, 0, 1);
			} else {
			    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
			}
		}

		beforeEach(function () {
			this.fetchAddEventDeferred = deferred()
			cy.visit('/submit', {
				onBeforeLoad (win) {
					cy.stub(win, 'fetch')
						.as('fetchAddEvent')
						.returns(this.fetchAddEventDeferred.promise)
				},
		    })
		})
	  	
	  	it('can submit valid event data', function () {
			
			// fill out the form with validEventData
		    cy.get('input[name=eventName]').type(validEventData.eventName)
			cy.get('textarea[name=description]').type(validEventData.description)
			cy.get('input[name=linkURL]').type(validEventData.linkURL)
			cy.get('input[name=cost]').type(validEventData.cost)
			cy.get('#datepicker-startDate').focus()
			cy.get('#datepicker-startDate').click()
			cy.get('button.react-datepicker__navigation--next').click()
			cy.get('.react-datepicker__day--001').first().click()
			cy.get('input[name=locationName]').type(validEventData.locationName)
			cy.get('input[name=locationStreet]').type(validEventData.locationStreet)
			cy.get('input[name=authorName]').type(validEventData.authorName)
			cy.get('input[name=authorEmail]').type(validEventData.authorEmail)

			cy.get('#submitEvent').click()
			this.fetchAddEventDeferred.resolve({
		        json () { return {message:'success'} },
		        ok: true,
		    })
			cy.get('@fetchAddEvent').should('be.calledWith', '/.netlify/functions/add-event/')
	    })
	})
  
})
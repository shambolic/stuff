#!/bin/bash
# ---BACKUP SPOTLIGHT'S PIVOTAL PROJECTS ----
	JTOKEN=246b6e706fd8e0b97271d58e6681ad60
	
	
	curl -k -X POST -H "X-TrackerToken: ${JTOKEN}" \
		-H "Content-Type: application/json" \
		 -d '{
  			"ids":[65631094, 65357962]
		 }' \
			  https://www.pivotaltracker.com/services/v5/stories/export 
	
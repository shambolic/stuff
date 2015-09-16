#!/bin/bash
# ---Get Stories Created in the Last Month----
	JTOKEN=246b6e706fd8e0b97271d58e6681ad60
	PROJECT_ID=926050
	
	
	curl -k -X GET -H "X-TrackerToken: $JTOKEN" \
\
https://www.pivotaltracker.com/services/v5/projects/$PROJECT_ID/stories?created_after="2014-01-01T00:00:00Z"&with_state="accepted"
	
		
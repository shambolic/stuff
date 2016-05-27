# assignment 3 - health data - question 2
best <- function(state, outcome) {
        ## Read outcome data
        outcome.data <- read.csv(file="outcome-of-care-measures.csv", stringsAsFactors = FALSE)  # important to turn off Factors
        possible.outcomes <- c("heart attack", "heart failure", "pneumonia")
        ## Check that state and outcome are valid
        validateStates <-function(state, outcome.data) {
                states <- unique(outcome.data$State)
                if (!state %in% states) {stop("invalid state")}
        }
        validateOutcomes <- function(outcome, possible.outcomes){
                if (!outcome %in% possible.outcomes) {stop("invalid outcome")}     
        }
        subStates <-function (state, data){
                state.data <<- data[which(data$State == state), ]  
        }
        if(outcome == "heart attack") col.number = 11
        if(outcome == "heart failure") col.number = 17
        if(outcome == "pneumonia") col.number = 23
        # run functions
        validateStates(state, outcome.data)
        validateOutcomes(outcome, possible.outcomes)     
        subStates(state,outcome.data)
        ## Return hospital name in that state with lowest 30-day death
        ## rate
        # recode 'not available' to NA's to be able to coerce to numerics and get minimum
        state.data[,col.number][state.data[,col.number]=="Not Available"] <-NA  
        # coerce to numberic    
        state.data[,col.number] <-as.numeric(state.data[,col.number])
        # 'which' returns the index for which the condition is true (i.e. = min)
        results <- state.data[which(state.data[, col.number] == min(state.data[, col.number], na.rm=TRUE)),2]
        sort(results)
}

best("AK", "pneumonia")
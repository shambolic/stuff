# Assignment - week 3 - question 4

rankall <- function(outcome, num = "best") {
        ## Read outcome data
        data <- read.csv(file="outcome-of-care-measures.csv", stringsAsFactors = FALSE)  # important to turn off Factors
         validateOutcomes <- function(outcome, possible.outcomes){
                if (!outcome %in% possible.outcomes) {stop("invalid outcome")}     
        }
        # Check that state and outcome are valid
        states <- unique(data$State)
        possible.outcomes <- c("heart attack", "heart failure", "pneumonia")
        if(outcome == "heart attack") col.number = 11
        if(outcome == "heart failure") col.number = 17
        if(outcome == "pneumonia") col.number = 23
        # Handle arguments and Check that state and outcome are valid

        validateOutcomes(outcome, possible.outcomes)
        number.states <- nrow(states)  # count number of hospitals in state (after removing NAs!)
        if (num == "best") num = 1
        # if (num == "worst") num = number.states
        # if (num > number.states) NA

        ## For each state, find the hospital of the given rank
        hospital.vector <- c()
        state.vector <-c()
        
        process.states <- function(data, states, col.number, num ){
                for (state in states) {
                         # subset data for state
                        state.data <- data[which(data$State == state), ] 
                        # recode 'not available' to NA's to be able to coerce to numerics and get minimum
                        state.data[,col.number][state.data[,col.number]=="Not Available"] <- NA
                        # remove NA's for given outcome
                        state.data <- state.data[!is.na(state.data[,col.number]),]
                        # coerce to numeric    
                        state.data[,col.number] <-as.numeric(state.data[,col.number])
                        # create ranked list for each staet on outcome
                        ranked.index <- rank(state.data[,col.number])
                        rankings <- data.frame(ranks=ranked.index, name=state.data[,2], value=state.data[,col.number])
                        ordered <-rankings[with(rankings, order(ranks, name)),]
                        df <- sapply(ordered, is.factor) # remove factors
                        ordered[df] <-lapply(ordered[df], as.character)
                        # results <- data.frame(hostpital=ordered[,2][num], state=state)
                        # if num is worst, return last item in state list
                        # if (num > nrow(state.data)) result <- NA
                        # if (num == "worst") num = nrow(ordered)
                        rows <- nrow(ordered)
                        i <- num
                        if (num == "worst") i <-rows
                        result <- ordered[,2][i]
                        # if (num > nrow(state.data)) result <- NA
                        hospital.vector = append(hospital.vector, result)
                        state.vector = append(state.vector, state)
       
                }
        results.df <- data.frame(hospital=hospital.vector, state=state.vector)
        results.df[order(results.df$state),]
                }
    
        ## (abbreviated) state name
process.states(data, states, col.number, num)
        }
# exam questions
# rankall("heart failure", 10)
# r <- rankall("heart failure", 10)
# as.character(subset(r, state == "NV")$hospital)
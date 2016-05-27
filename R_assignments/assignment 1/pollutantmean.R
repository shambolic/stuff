loadData <- function(directory){
# loads data from directory and merges into single dataframe
        files <- list.files(path=directory, pattern = ".*\\.csv$", full.names="TRUE")
        data_frame <- lapply(files, read.csv)
        do.call(rbind, data_frame) # merges elements to single dataframe called data_frame
}

pollutantmean <- function(directory, pollutant, id=1:332){
# calculates the mean pollution values given a vecotor of station id's
        data <- loadData(directory)
# NB:  the %in% finds all matches within vector ID
        sub <- data[which(data$ID %in% id),]  
        mean(sub[[pollutant]], na.rm=TRUE)
}

# pollutantmean("specdata", "nitrate", 23)
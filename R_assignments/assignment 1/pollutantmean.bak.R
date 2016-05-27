pollutantmean <- function(directory, pollutant, id=1:322){
# open file with specified directory
 # list.files(path = directory)

  for (file in id) {
          if(file<10) {
                  file <-paste0("00",file)
                  } 
          if (file> 10 && file < 100) {
                  file<-paste0("0",file) 
                  }
          file <- paste0(file,".csv")
          # print(file)
          
          data_frame <- read.csv(paste0(directory,"/",file))

          
           # print(paste0(file,".csv"))    

                      # paste0(file,".csv")
        # print(paste0(file, ".csv"))
                  # basefiles <- list.files(path = directory, pattern = ".*\\.csv$" )
        # selectedfiles <- grep(paste0("\"",as.character(file),"\".*\\.csv$"), basefiles)
        # 
                 # list.files(path='.', pattern="(XM|EM).*\\.csv$")
        # list.files(path = directory, pattern = "^id[i]+.*")  grep("file)
        
          }
data_frame
        }
pollutantmean("specdata", "sulphate", 1:5)


#<- read.csv(paste("./",directory,"/", id,".csv", sep =""))
#
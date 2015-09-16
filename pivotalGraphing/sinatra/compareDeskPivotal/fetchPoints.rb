#!/Users/jay/.rvm/rubies/ruby-1.9.2-p320/bin/ruby
# a script to query pivotal for stories given command line parameters

require 'csv'
require 'json'
require 'uri'
require 'net/http'

if !ARGV[0]
  abort("This script queries Pivotal Tracker for points delivered in a given time range.\n\nUsage:  fetchPoints.rb STATE (accepted, delivered, finished, started, rejected, unstarted, unscheduled ) STARTDATE (optional. either in format YYYY-MM-DD or 'nil') ENDDATE (optional. either in format YYYY-MM-DD or 'nil') ")
end

projectID = 926050
token ='246b6e706fd8e0b97271d58e6681ad60'
state = ARGV[0]

if (ARGV[1] != "nil")
  startDate = "created_after=" + DateTime.strptime(ARGV[1],'%Y-%m-%d').to_s.sub(/\+00:00/, 'Z')
else 
  startDate = ""
end

if (ARGV[2] != "nil")
  endDate = "&created_before="+ DateTime.strptime(ARGV[2],'%Y-%m-%d').to_s.sub(/\+00:00/, 'Z')
else
  endDate=''
end

 filter = URI.escape("#{startDate}#{endDate}&with_state=#{state}")

# 2013-11-01T00:00:00+00:00
# what pivotal understands  2014-01-01T00:00:00Z
# what ruby produces:       2014-02-18T08:06:21+00:00

def getProjectIDs (token) 
  uri = URI.parse("https://www.pivotaltracker.com/services/v5/projects/")
  http= Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  request = Net::HTTP::Get.new(uri.request_uri)
  request ['X-TrackerToken'] = "#{token}"
  response = http.request(request)
  responseArray = JSON.parse(response.body)
  @ids= Array.new
  responseArray.each {|project|
  projectHash = project.to_hash
  @ids.push(projectHash["id"]) 
  
  }  
return @ids
end

getProjectIDs(token) 
puts "ids are:\n#{@ids}"

# => now that we have an array of IDs we can get stories for each one.
# what do we want to show?  what(number) y axis - state(y axis nested (barchart)) - when - x axis 
#   * points/features/stories/bugs/chores - this is a drop down menu
#   * accepted/delivered/accepted/ 
#   * last month (starDate = DateTime.now - 1.month, endDate=) 
#     last 3 months
#     last 6 months
#     last 12 months
#     globally
# http://railscasts.com/episodes/223-charts



def getStories(projectID, filter, state, startDate, endDate)
  uri = URI.parse("https://www.pivotaltracker.com/services/v5/projects/#{projectID}/stories?#{filter}")
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  request = Net::HTTP::Get.new(uri.request_uri)
  request['X-TrackerToken'] ='246b6e706fd8e0b97271d58e6681ad60'
  response = http.request(request)
  # puts "response body is:\n #{response.body}\n"
  responseArray = JSON.parse(response.body)
  points = 0
  stories = 0
  
  responseArray.each {|story|
    storyHash = story.to_hash
    points += storyHash["estimate"].to_i
    stories += 1
    puts "points: #{points} and stories: #{stories}\nDescription: #{storyHash["name"]}\n\n"
  }
  puts "there are #{stories} stories that are #{state} since#{startDate}, totalling #{points} points.\n"  
end

# puts "...finding stories: " + filter
# getStories projectID, filter, state, startDate, endDate





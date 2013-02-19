#!/usr/bin/env ruby -w

require 'rubygems'
require 'nokogiri'
require 'flickraw'
require 'date'

FlickRaw.api_key="dc10c893c042548cf9111723e56e6fa2"
FlickRaw.shared_secret="eff6262b837c5da4"

def get_nsids(doc)
  nsids = []
  inputs = doc.xpath("//form[@action=\"groups_pending.gne\"]/input[@name=\"user\"]")
  nsids = inputs.inject([]) {|arr, input| arr << input.attribute('value').value }

  nsids.uniq
end

def is_inactive(nsid)
  photos = flickr.people.getPublicPhotos :user_id => nsid, :per_page => 5
  $stderr.puts "User #{nsid} has at least #{photos.to_a.size} photos"

  if photos.to_a.empty?
    inactive = true
  end

  inactive
end

def get_leavers(nsids)

  leavers = []
  nsids.each do |nsid|
    begin
      if is_inactive(nsid)
        $stderr.puts "#{nsid} is inactive"
        leavers << nsid
      else
        $stderr.puts "#{nsid} is still active"
      end
    rescue
      $stderr.puts "Error fetching details for #{nsid}"
    end

    sleep(1)
  end

  leavers
end

def get_location(person)
  location = ""
  if (defined? person.location)
    location = person.location
  end

  location
end

def is_londoner(person)
  london_words = %w{londinium london richmond croydon}

  # Check profile location
  location = get_location(person)
  accepted = london_words.any? {|word| location.downcase.include?(word)}

  # Check photoset titles
  if (!accepted)
    photosets = flickr.photosets.getList :user_id => person.nsid
    photosets.each do |ps|
      if (london_words.any? {|word| ps.title.downcase.include?(word)})
        accepted = true
        break
      end
    end
  end

  # Check tags
  if (!accepted)
    photos = flickr.photos.search :user_id => person.nsid, :tags => london_words.join(", ")
    $stderr.puts "Found #{photos.size} photos with london tags for user #{person.username}"
    accepted = photos.size >= 15
  end

  accepted
end

def get_londoners(nsids)

  londoners = []
  nsids.each do |nsid|
    begin
      person = flickr.people.getInfo :user_id => nsid
      if (is_londoner(person))
        $stderr.puts "username #{person.username} (#{nsid}) is a Londoner"
        londoners << nsid
      else
        $stderr.puts "username #{person.username} (#{nsid}) is not a Londoner"
      end
    rescue => e
      $stderr.puts "Error fetching details for #{nsid}: #{e}"
    end

    sleep(1)
  end

  londoners
end

def to_js_arr(name, arr)

  js_arr_start = "var #{name} = ["
  js_arr_els = arr.inject([]) {|arr, el| arr << "\"#{el}\""}
  js_arr_end = "];"

  js_arr_start + js_arr_els.join(", ") + js_arr_end
end

if (ARGV.empty?)
  puts "analyser.rb <members HTML file>"
  exit(-1)
end
filename = ARGV[0]

doc = Nokogiri::HTML(File.open(filename))

nsids = get_nsids(doc)

puts to_js_arr("leavers", get_leavers(nsids))
#puts to_js_arr("londoners", get_londoners(nsids))



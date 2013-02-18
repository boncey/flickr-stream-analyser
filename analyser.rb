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
  year_ago = Time.now - (60 * 60 * 24 * 365)
  photos = flickr.people.getPublicPhotos :user_id => nsid, :per_page => 5, :extras => 'date_upload'

  if !photos.to_a.empty?
    photo = photos[0]
    uploaded = Time.at(photo.dateupload.to_i)
    inactive = uploaded < year_ago
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

def is_londoner(person, location)
  photoset_matches = false
  london_words = %w{londinium london richmond croydon}

  profile = london_words.any? {|word| location.downcase.include?(word)}

  if (!profile)
    photosets = flickr.photosets.getList :user_id => person.nsid
    photosets.each do |ps|
      if (london_words.any? {|word| ps.title.downcase.include?(word)})
        $stderr.puts "Photoset #{ps.title} is a London Photoset"
        photoset_matches = true
        break
      end
    end
  end

  profile || photoset_matches
end

def get_londoners(nsids)

  londoners = []
  nsids.each do |nsid|
    begin
      person = flickr.people.getInfo :user_id => nsid
      location = get_location(person)
      if (is_londoner(person, location))
        $stderr.puts "username #{person.username} (#{nsid}) with location '#{location}' is a Londoner"
        londoners << nsid
      else
        $stderr.puts "username #{person.username} (#{nsid}) with location '#{location}' is not a Londoner"
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

#puts to_js_arr("leavers", get_leavers(nsids))
puts to_js_arr("londoners", get_londoners(nsids))



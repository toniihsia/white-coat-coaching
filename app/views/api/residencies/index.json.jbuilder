@residencies.each do |residency|
  json.set! " #{residency.id}" do
    json.partial! 'residency', residency: residency
  end
end

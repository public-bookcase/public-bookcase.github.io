// Copyright (C) 2020 Markus Peloso
// 
// This file is part of Public bookcase map.
// 
// Public bookcase map is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// Public bookcase map is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with Public bookcase map.  If not, see <http://www.gnu.org/licenses/>.

import { toWikimediaCommonsUrl, toMapillaryUrl } from "./utilities/image";
import { toUrl } from "./utilities/url";

export function extractName(tags: any, langCode: string) {
  return (
    tags[`name:${langCode}`] ||
    tags[`short_name:${langCode}`] ||
    tags[`official_name:${langCode}`] ||
    tags[`int_name:${langCode}`] ||
    tags[`nat_name:${langCode}`] ||
    tags[`reg_name:${langCode}`] ||
    tags[`loc_name:${langCode}`] ||
    tags[`old_name:${langCode}`] ||
    tags[`alt_name:${langCode}`] ||
    tags.name ||
    tags.short_name ||
    tags.official_name ||
    tags.int_name ||
    tags.nat_name ||
    tags.reg_name ||
    tags.loc_name ||
    tags.old_name ||
    tags.alt_name
  );
}

export function extractType(local: any, tags: any) {
  return (
    local["public_bookcase:type"][tags["public_bookcase:type"]] ||
    (tags.amenity === "library" &&
    tags.library !== "booksharing" &&
    tags.fee === "no"
      ? local.library
      : "") ||
    (tags.shop === "books" ? local.bookshop : "") ||
    (tags.amenity === "give_box" ? local.giveBox : "") ||
    local.default
  );
}

export function extractOperator(tags: any) {
  return tags.operator || tags.brand || tags.network;
}

export function extractImage(tags: any): string | undefined {
  return (
    toWikimediaCommonsUrl(tags.wikimedia_commons) ||
    toMapillaryUrl(tags.mapillary) ||
    toUrl(tags.flickr) ||
    toWikimediaCommonsUrl(tags.image) ||
    toUrl(tags.picture)
  );
}

export function extractLocality(address: any): any {
  return (
    address.city ||
    address.town ||
    address.village ||
    address.suburb ||
    address.neighbourhood ||
    address.state ||
    address.county
  );
}

export function extractStreet(result: any, local: { code: string }): any {
  return (
    result.address.path ||
    result.address.footway ||
    result.address.road ||
    result.address.cycleway ||
    result.address.pedestrian ||
    result.address.farmyard ||
    result.address.construction ||
    extractName(result.namedetails, local.code || "en") ||
    result.address.neighbourhood
  );
}
